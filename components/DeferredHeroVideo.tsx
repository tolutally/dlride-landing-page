export default function DeferredHeroVideo() {
  return (
    <video
      src="/highway%20video%20hero.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-cover"
      aria-hidden="true"
    />
  );
}
