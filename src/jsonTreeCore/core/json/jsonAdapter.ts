const contentToJson = async (value: string): Promise<object> => {
  try {
    let jsonStr = value;
    const nextDataMatch = value.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (nextDataMatch && nextDataMatch[1]) {
      jsonStr = nextDataMatch[1].trim();
    }
    let json: object = JSON.parse(jsonStr);
    return Promise.resolve(json);
  } catch (error: any) {
    throw error;
  }
};

const jsonToContent = async (json: string): Promise<string> => {
  try {
    let contents = json;
    if (!json) return json;
    return Promise.resolve(contents);
  } catch (error: any) {
    throw error;
  }
};

export { contentToJson, jsonToContent };
