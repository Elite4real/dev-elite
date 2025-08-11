export default function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-100">
      <div className="container-narrow py-10 text-sm text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Elijah. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
