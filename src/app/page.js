import ComingSoon from "@/components/Comingsoon/ComingSoon";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-900">
      <Header />
      <ComingSoon />
      <Footer />
    </div>
  );
}
