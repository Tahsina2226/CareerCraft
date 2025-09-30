"use client";

export default function AboutBackground() {
  return (
    <style jsx global>{`
      html {
        scroll-behavior: smooth;
      }

      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #b8c4a9;
      }
      ::-webkit-scrollbar-thumb {
        background: #5d6d4b;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #4a5741;
      }
    `}</style>
  );
}
