export class JestTestFile {
  constructor(
    private readonly filename: string,
    private readonly content: string
  ) {}

  data() {
    return {
      filename: this.filename,
      content: this.content,
    };
  }

  getTestLines(): {
    title: string
    line: number
    indent: number
  }[] {
    const regex =
      /^(?<indent>\s*)(?:it|test)(?:\.(?:skip|only|todo))?(?:\.each\s*\([\s\S]*?\))?\s*\(\s*\n?\s*["'`](?<title>.*?)["'`]/gm;

    const matches: { title: string; line: number; indent: number }[] = [];

    let match: RegExpExecArray | null;
    while ((match = regex.exec(this.content)) !== null) {
      const lineIndex = this.content
        .substring(0, match.index)
        .split('\n').length;
      const indent = match.groups?.indent?.length ?? 0;
      const title = match.groups?.title ?? '';
      matches.push({ title, line: lineIndex, indent });
    }

    return matches;
  }

  static fromData(data: { filename: string; content: string }) {
    return new JestTestFile(data.filename, data.content);
  }
}
