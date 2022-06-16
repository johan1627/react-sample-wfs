import ApiServices from "../config";

export async function fetchCharacters(params: any) {
  const END_POINT = "api/characters";

  return ApiServices({
    url: END_POINT,
    method: "GET",
    params: params,
  });
}
