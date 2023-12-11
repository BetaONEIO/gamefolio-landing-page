export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/blog.gamefolio.com', // Replace '/new-url' with your desired path
      permanent: true, // Set to true if the redirect is permanent
    },
  };
}

export default function Blog() {
  // Render your component or return null
  return null;
}
