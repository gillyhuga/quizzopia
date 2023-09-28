import Head from "next/head";

interface HeadMetaProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const HeadMeta: React.FC<HeadMetaProps> = ({
  title = "Home",
  description = "Quizzopia is your ultimate destination for knowledge and fun!",
  keywords = "Quizzopia, Online quizzes, Knowledge challenges, Trivia games, Quiz platform",
}) => {
  return (
    <Head>
      <title>{title} | Quizzopia</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>
  );
};

export default HeadMeta;
