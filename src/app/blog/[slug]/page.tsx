export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  console.log(params.slug);

  return <div className=""></div>;
}
