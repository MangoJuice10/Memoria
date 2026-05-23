import { Injectable } from "@nestjs/common";
import { RecursiveCharacterTextSplitter, TextSplitter } from "@langchain/textsplitters";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import { extname } from "path";

@Injectable()
export class DocumentParserService {
  private readonly textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  async extractAndChunk(buffer: Buffer, filename: string): Promise<string[]> {
    const text = (await this.extractText(buffer, filename))
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n");
    const documents = await this.textSplitter.createDocuments([text]);
    return documents.map((document) => document.pageContent.trim()).filter(Boolean);
  }

  private async extractText(buffer: Buffer, filename: string): Promise<string> {
    const ext = extname(filename).toLowerCase();

    switch (ext) {
      case ".pdf": {
        const pdfParser = new PDFParse(new Uint8Array(buffer));
        const result = await pdfParser.getText();
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
