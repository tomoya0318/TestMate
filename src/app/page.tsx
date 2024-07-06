import { auth } from "@/libs/auth";

const Home = async() => {
  const session = await auth();
  return (
    <>
      <div>Home page</div>
      <h2>現在のセッションデータ</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
};

export default Home;