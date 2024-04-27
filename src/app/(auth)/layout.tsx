import Header from "@/common/header/header";
import Footer from "@/common/footer/footer";

export default function loggedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
