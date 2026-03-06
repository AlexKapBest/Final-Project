import Header from '@app/header'
import Footer from '@app/footer'
import Router from '@app/router'

const Layout = () => (
  <>
    <Header />
    <main style={{ minHeight: 'calc(100vh - 130px)', padding: '24px 0' }}>
      <Router />
    </main>
    <Footer />
  </>
)

export default Layout

