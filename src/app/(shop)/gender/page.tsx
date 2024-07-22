interface PropsPage {
  params: {
    gender: string
  }
  searchParams: {
    page?: string
  }
}
export default function NamePage({ params, searchParams }: PropsPage) {
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  )
}
