/** used for type generator */
export const pathRewriter = () => {
  return (content: string) => {
    content = content.replaceAll(`@packages/`, `./`)
    return content
  }
}
