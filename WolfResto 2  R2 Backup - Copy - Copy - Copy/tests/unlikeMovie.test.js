/* eslint-disable no-undef */
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";
import * as TestFactories from "./helpers/testFactories";

global.structuredClone = jest.fn((val) => JSON.parse(JSON.stringify(val)));

// eslint-disable-next-line no-undef
describe("Unliking A Restaurant", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = "<div id=\"likeButtonContainer\"></div>";
  };

  // eslint-disable-next-line no-undef
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  // eslint-disable-next-line no-undef
  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  // eslint-disable-next-line no-undef
  it("should display unlike widget when the movie has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    // eslint-disable-next-line no-undef
    expect(document.querySelector("[aria-label=\"unlike this restaurant\"]")).toBeTruthy();
  });

  // eslint-disable-next-line no-undef
  it("should not display like widget when the movie has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    // eslint-disable-next-line no-undef
    expect(document.querySelector("[aria-label=\"like this restaurant\"]")).toBeFalsy();
  });

  // eslint-disable-next-line no-undef
  it("should be able to remove liked movie from the list", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    document.querySelector("[aria-label=\"unlike this restaurant\"]").dispatchEvent(new Event("click"));
    // eslint-disable-next-line no-undef
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  // eslint-disable-next-line no-undef
  it("should not throw error when user click unlike widget if the unliked movie is not in the list", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    // Hapus dulu film dari daftar film yang disukai
    await FavoriteRestaurantIdb.deleteRestaurant(1);
    // Kemudian, simulasikan pengguna menekan widget batal menyukai film
    document.querySelector("[aria-label=\"unlike this restaurant\"]").dispatchEvent(new Event("click"));
    // eslint-disable-next-line no-undef
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});