import { FC, ReactNode } from "react";
import QRow from "./QRow";

type QLayoutProps = {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
};

const QLayout: FC<QLayoutProps> = ({ sidebar, header, children, footer }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div style={{
            marginLeft: "220px",
            padding: "20px",
            width: "100%",
          }}>
        <header className="max-w-screen-2xl mx-auto w-full">{header}</header>
      </div>

      <div className="max-w-screen-2xl mx-auto w-full">
        <QRow
          sidebar={
            <aside 
            style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "220px",
            backgroundColor: "#f8f9fa",
            padding: "20px",
            zIndex: 1000,
            borderRight: "1px solid #ddd"

            }}>{sidebar}</aside>
          }
        >
          <div
          style={{
            marginLeft: "220px", 
            padding: "20px",
            width: "100%",
          }}
        >
          <main className="py-6">{children}</main>
          </div>
        </QRow>
      </div>

      <footer className="border-t" style={{
            marginLeft: "220px", 
            padding: "20px",
            width: "100%",
          }}>{footer}</footer>
    </div>
  );
};

export default QLayout;
