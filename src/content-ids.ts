export function flatPostId(entry: string): string {
  return entry.split(/[\\/]/).at(-1)!.replace(/\.(?:md|mdx)$/i, '');
}

export function assertUniqueFlatPostIds(entries: string[]): void {
  const sourceById = new Map<string, string>();

  for (const entry of entries) {
    const id = flatPostId(entry);
    const existing = sourceById.get(id);

    if (existing && existing !== entry) {
      throw new Error(
        `Duplicate flattened post ID "${id}" from "${existing}" and "${entry}". `
        + 'Post basenames must be unique across src/content/posts.',
      );
    }

    sourceById.set(id, entry);
  }
}
