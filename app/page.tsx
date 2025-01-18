import { CardList, Footer, Header } from "./components";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <CardList />
      </main>
      <Footer />
    </>
  );
}
