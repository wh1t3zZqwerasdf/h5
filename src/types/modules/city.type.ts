export type DictCityType = {
  id: string;
  name: string;
  level: number;
  parentId: string; 
  childList?: DictCityType[] | null;
};

export type CityApiType = {
    id: string;
    name: string;
    shortName: string;
    countyMark: number;
    level: number;
    childList?: CityApiType[];
    type:number
  };
  