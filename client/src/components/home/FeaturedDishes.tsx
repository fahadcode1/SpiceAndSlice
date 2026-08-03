import MenuDishes from "../menu/MenuDishes.js"
import MenuDishes2 from "../menu/MenuDishes02.js";

const FeatureDishes = () => {
  return <> 
      <MenuDishes featuredOnly={true} />
       <MenuDishes2 featuredOnly={true} />;
    </>
}

export default FeatureDishes