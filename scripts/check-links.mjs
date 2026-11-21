import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const TOOL = "webcraft-link-checker";
const SCHEMA_VERSION = "1.0";
const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, "..");

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function removeFencedCodeBlocks(content) {
  let fence = null;
  const lines = content.split(/\r?\n/);
  let paragraphOpen = false;
  let listContentIndent = null;
  let indentedCodeIndent = null;

  return lines.map((line) => {
    const opening = /^ {0,3}(\x60{3,}|~{3,})/.exec(line);
    if (!fence && opening) {
      const info = line.slice(opening[0].length);
      if (opening[1][0] !== "\x60" || !info.includes("\x60")) {
        fence = { character: opening[1][0], length: opening[1].length };
        paragraphOpen = false;
        listContentIndent = null;
        indentedCodeIndent = null;
        return "";
      }
    }

    if (fence) {
      const closing = new RegExp(
        "^ {0,3}" + fence.character + "{" + fence.length + ",}[ \\t]*$",
      );
      if (closing.test(line)) {
        fence = null;
        paragraphOpen = false;
        listContentIndent = null;
        indentedCodeIndent = null;
      }
      return "";
    }

    if (!line.trim()) {
      paragraphOpen = false;
      return line;
    }

    const atxHeading = /^ {0,3}#{1,6}(?:[ \t]+|$)/.test(line);
    const setextUnderline = /^ {0,3}(?:=+|-+)[ \t]*$/.test(line);
    if (atxHeading || setextUnderline) {
      paragraphOpen = false;
      listContentIndent = null;
      indentedCodeIndent = null;
      return line;
    }

    const listItem = /^( {0,3})([-+*]|\d+[.)])([ \t]+)/.exec(line);
    if (listItem) {
      const markerIndent = listItem[1].length;
      const markerWidth = listItem[2].length;
      const whitespaceWidth = listItem[3].replace(/\t/g, "    ").length;
      listContentIndent = markerIndent + markerWidth + whitespaceWidth;
      paragraphOpen = true;
      indentedCodeIndent = null;
      return line;
    }

    const leadingSpaces = /^( *)/.exec(line)[1].length;
    const effectiveIndent = line.startsWith("\t") ? 4 : leadingSpaces;
    const isIndented = effectiveIndent >= 4;

    if (isIndented) {
      if (indentedCodeIndent !== null) {
        if (effectiveIndent >= indentedCodeIndent) return "";
        indentedCodeIndent = null;
      }

      const continuesList = listContentIndent !== null &&
        effectiveIndent >= listContentIndent &&
        effectiveIndent < listContentIndent + 4;
      const nestedListCode = listContentIndent !== null &&
        effectiveIndent >= listContentIndent + 4;

      if (nestedListCode || (!paragraphOpen && !continuesList)) {
        indentedCodeIndent = effectiveIndent;
        return "";
      }

      paragraphOpen = true;
      return line;
    }

    indentedCodeIndent = null;
    if (listContentIndent !== null && leadingSpaces < listContentIndent) {
      listContentIndent = null;
    }
    paragraphOpen = true;
    return line;
  }).join("\n");
}
