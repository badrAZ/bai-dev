import { injectable } from 'inversify'
import * as vscode from 'vscode'

@injectable()
export class JestRunnerResult {
  private passedDecoration: vscode.TextEditorDecorationType
  private failedDecoration: vscode.TextEditorDecorationType
  private runningDecoration: vscode.TextEditorDecorationType
  private diagnosticCollection: vscode.DiagnosticCollection
  private disposables: vscode.Disposable[] = []
  private editor?: vscode.TextEditor
  private range?: vscode.Range

  constructor() {
    this.passedDecoration = vscode.window.createTextEditorDecorationType({
      after: {
        contentText: ' ✅',
        color: new vscode.ThemeColor('testing.iconPassed'),
        margin: '0 0 0 1em',
      },
      isWholeLine: true,
    })

    this.failedDecoration = vscode.window.createTextEditorDecorationType({
      after: {
        contentText: ' ❌',
        color: new vscode.ThemeColor('testing.iconFailed'),
        margin: '0 0 0 1em',
      },
      isWholeLine: true,
    })

    this.runningDecoration = vscode.window.createTextEditorDecorationType({
      after: {
        contentText: ' ⏳ Running...',
        color: new vscode.ThemeColor('editorInfo.foreground'),
        margin: '0 0 0 1em',
      },
      isWholeLine: true,
    })

    this.diagnosticCollection =
      vscode.languages.createDiagnosticCollection('jest-runner')
  }

  init(editor: vscode.TextEditor, range: vscode.Range): void {
    this.editor = editor
    this.range = range
  }

  getEditor(): vscode.TextEditor {
    if (!this.editor) {
      throw new Error('JestRunnerResult is not initialized with an editor')
    }
    return this.editor
  }

  getRange(): vscode.Range {
    if (!this.range) {
      throw new Error('JestRunnerResult is not initialized with a range')
    }
    return this.range
  }

  addRunningState(): void {
    this.clear()
    this.getEditor().setDecorations(this.runningDecoration, [this.getRange()])
  }

  addPassedState(message: string): void {
    const range = this.getRange()
    const editor = this.getEditor()

    this.clear()
    editor.setDecorations(this.passedDecoration, [range])
    this.diagnosticCollection.set(editor.document.uri, [
      new vscode.Diagnostic(
        this.getDecorationRange(),
        message,
        vscode.DiagnosticSeverity.Information
      ),
    ])
  }

  addFailedState(message: string): void {
    const editor = this.getEditor()
    const range = this.getRange()

    this.clear()
    editor.setDecorations(this.failedDecoration, [range])
    this.diagnosticCollection.set(editor.document.uri, [
      new vscode.Diagnostic(
        this.getDecorationRange(),
        message,
        vscode.DiagnosticSeverity.Error
      ),
    ])
  }

  clear(): void {
    const editor = this.getEditor()
    editor.setDecorations(this.passedDecoration, [])
    editor.setDecorations(this.failedDecoration, [])
    editor.setDecorations(this.runningDecoration, [])
    this.diagnosticCollection.clear()
  }

  dispose(): void {
    this.passedDecoration.dispose()
    this.failedDecoration.dispose()
    this.runningDecoration.dispose()
    this.diagnosticCollection.dispose()
    this.disposables.forEach(d => d.dispose())
  }

  private getDecorationRange(): vscode.Range {
    const range = this.getRange()
    const editor = this.getEditor()
    const textLength = editor.document.lineAt(range.start.line).text.length

    return new vscode.Range(
      range.start,
      new vscode.Position(range.end.line, textLength)
    )
  }
}
