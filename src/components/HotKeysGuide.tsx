function HotKeysGuide({ hotKeyList }: { hotKeyList: string[] }) {
  return (
    <div className="space-x-1">
      <span className="sr-only">The keyboard shortcut is:</span>

      <>
        {hotKeyList.map((hotKey, index) => (
          <kbd
            key={index}
            className="inline-block bg-background/10 rounded-full px-1 py-0.5"
          >
            {hotKey}
          </kbd>
        ))}
      </>
    </div>
  );
}

export default HotKeysGuide;
