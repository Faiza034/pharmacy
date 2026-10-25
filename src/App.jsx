import { CartProvider } from "./cart";
import { usePath } from "./router";
import { Header, Footer, CartDrawer } from "./Layout";
import Landing from "./Landing";
import { Shop, ProductPage, Checkout, OrderSuccess, NotFound } from "./pages";

function Shell() {
  const path = usePath();
  let page;
  if (path === "/") page = <Landing />;
  else if (path === "/shop") page = <Shop />;
  else if (path.startsWith("/product/")) page = <ProductPage id={path.split("/")[2]} />;
  else if (path === "/checkout") page = <Checkout />;
  else if (path === "/order-success") page = <OrderSuccess />;
  else page = <NotFound />;

  return (
    <>
      <Header path={path} />
      <main>{page}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  );
}
