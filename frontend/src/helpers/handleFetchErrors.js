/*
 * The fetch api does not throw on errors automatically.
 *
 * See: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
 *
 */
export default (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
