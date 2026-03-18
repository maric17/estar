import axios from 'axios';

const SHEET_ID = '1k1Ki4jtx6GPbdfDDGURM8hBWllyoGxrioyzUrniqtIk';
const BASE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`;

export interface ProvinceData {
  phase: number;
  status: string;
  yearComplete: number;
  provinceThai: string;
  provinceName: string;
  totalDistricts: number;
  numberOfVillages: number;
  houseChurches: number;
  newDistrictChurches: number;
  totalPopulation: number;
  lat: number;
  long: number;
}

const COLUMN_MAPPING: Record<string, keyof ProvinceData> = {
  'Phase': 'phase',
  'Status': 'status',
  'Year Complete': 'yearComplete',
  'Province Thai': 'provinceThai',
  'Province Name': 'provinceName',
  'Total Districts': 'totalDistricts',
  'Number of Villages': 'numberOfVillages',
  'House Churches': 'houseChurches',
  'New District Churches': 'newDistrictChurches',
  'Total Population': 'totalPopulation',
  'Lat': 'lat',
  'Long': 'long',
};

export async function fetchAllProvinces(): Promise<ProvinceData[]> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        tqx: 'out:json',
        tq: 'SELECT A, B, C, D, E, F, G, H, I, W, AC, AD',
      },
    });

    const text = response.data;
    const jsonStart = text.indexOf('({') + 1;
    const jsonEnd = text.lastIndexOf('})') + 1;
    const jsonStr = text.substring(jsonStart, jsonEnd);
    
    const data = JSON.parse(jsonStr);
    const cols = data.table.cols.map((col: { label: string; id: string }) => col.label?.trim() || col.id);
    
    return data.table.rows.map((row: { c: Array<{ v: string | number | null } | null> }) => {
      const province: Partial<ProvinceData> = {};
      row.c.forEach((cell, i: number) => {
        const rawLabel = cols[i];
        // Find mapping for label or use column ID mapping if label doesn't match
        const key = COLUMN_MAPPING[rawLabel] || rawLabel;
        (province as Record<string, string | number | null>)[key] = cell ? cell.v : null;
      });
      return province as ProvinceData;
    }).filter((p: ProvinceData) => p.provinceName); // Filter out empty rows
  } catch (error) {
    console.error('Error fetching province data:', error);
    return [];
  }
}

export async function fetchProvinceByName(name: string): Promise<ProvinceData | undefined> {
  const all = await fetchAllProvinces();
  return all.find(p => p.provinceName?.toLowerCase() === name.toLowerCase());
}
