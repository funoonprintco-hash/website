import dimensions from "./image-dimensions.json";
export function imageSize(src: string) {
  return (dimensions as Record<string, {width:number; height:number}>)[src] ?? {width:1200,height:1200};
}
