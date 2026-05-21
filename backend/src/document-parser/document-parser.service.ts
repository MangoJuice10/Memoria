import { Injectable } from "@nestjs/common";
import { RecursiveCharacterTextSplitter, TextSplitter } from "@langchain/textsplitters";
import mammoth from "mammoth";
import { extname } from "path";

@Injectable()
export class DocumentParserService {
  private readonly textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  async extractAndChunk(buffer: Buffer, filename: string): Promise<string[]> {
    const text = await this.extractText(buffer, filename);
    const documents = await this.textSplitter.createDocuments([text]);
    return documents.map((document) => document.pageContent);
  }

  private async extractText(buffer: Buffer, filename: string): Promise<string> {
    const ext = extname(filename).toLowerCase();

    switch (ext) {
      case ".pdf": {
        const pdfParse = require("pdf-parse");
        const result = await pdfParse(buffer);
        return result.text;
      }

      case ".doc":
      case ".docx": {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
      }

      case ".txt": {
        return buffer.toString("utf-8");
      }

      default:
        // TODO: create a new error class
        throw new Error("Unsupported file type");
    }
  }
}
