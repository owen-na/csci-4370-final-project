import WishListItem from "../components/WishListItem";

export default function WishList() {
  return (
    <div className="main-page">
      <div className="header">
        <h1>$name's Wish List</h1>
      </div>
      <WishListItem></WishListItem>
      {/* Will need to load these in dynamically aka from db */}
    </div>
  );
}
