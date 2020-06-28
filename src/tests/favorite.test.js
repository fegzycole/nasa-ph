import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { addToFavorite, removeFavorites } from '../redux/actions/favorites';

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  favorites: [],
};

jest.setTimeout(30000);

const picture = {
  date: '2020-06-28',
  explanation: "What are those spots on Jupiter? Largest and furthest, just right of center, is the Great Red Spot -- a huge storm system that has been raging on Jupiter possibly since Giovanni Cassini's likely notation of it 355 years ago.  It is not yet known why this Great Spot is red. The spot toward the lower left is one of Jupiter's largest moons: Europa. Images from Voyager in 1979 bolster the modern hypothesis that Europa has an underground ocean and is therefore a good place to look for extraterrestrial life. But what about the dark spot on the upper right? That is a shadow of another of Jupiter's large moons: Io. Voyager 1 discovered Io to be so volcanic that no impact craters could be found.  Sixteen frames from Voyager 1's flyby of Jupiter in 1979 were recently reprocessed and merged to create the featured image.  About 43 years ago, Voyager 1 launched from Earth and started one of the greatest explorations of the Solar System ever.    Free Download: Voyager Posters",
  hdurl: 'https://apod.nasa.gov/apod/image/2006/EuropaJupiter_Voyager_2792.jpg',
  media_type: 'image',
  service_version: 'v1',
  title: 'Europa and Jupiter from Voyager 1',
  url: 'https://apod.nasa.gov/apod/image/2006/EuropaJupiter_Voyager_960.jpg',
};

let store;
beforeEach(() => {
  store = mockStore(initialState);

  let user = {
    uid: 'Fj2ENRN63dhZzE6sVndc2wEm5fd2',
  };

  user = JSON.stringify(user);
  localStorage.setItem('user', user);
});

afterEach(async () => {
  await store.dispatch(removeFavorites());
});

it('successfully updates local storage', async done => {
  await store.dispatch(addToFavorite(picture)).then(async () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    expect(favorites.length).toBe(1);
    done();
  });
});
