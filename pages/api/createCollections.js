const { butter } = require("@/lib/api");
const getCollection = async ({ key, slug }) => {
  const resp = await butter.content.retrieve([key], {
    "fields.slug": slug,
  });

  const collection = resp.data.data[key];

  return collection && collection.length > 0 ? collection[0] : null;
};

const createCollection = async ({ key, fields }) => {
  const fetchCollection = async () =>
    await getCollection({
      key,
      slug: fields.slug,
    });

  const prevCollection = await fetchCollection();

  if (prevCollection) {
    return {
      new: false,
      collection: prevCollection,
    };
  }

  const resp = await fetch("https://api.buttercms.com/v2/content/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.BUTTERCMS_WRITE_TOKEN}`,
    },
    body: JSON.stringify({
      key,
      status: "published",
      fields: [
        {
          ...fields,
        },
      ],
    }),
  });

  const collection = await fetchCollection();

  return {
    new: true,
    collection,
  };
};

const createCollections = async ({
  mapArr = [
    { type: "tag", key: "blog_tag" },
    { type: "category", key: "blog_category" },
    { type: "author", key: "blog_author" },
  ],
  collections,
}) => {
  const data = await Promise.all(
    mapArr.map(async ({ type, key }) => {
      const data = collections.find(
        (collection) => collection.type === type
      ).data;

      const resp = await Promise.all(
        data.map(async (collection) => {
          const resp = await createCollection({
            key,
            fields: {
              ...collection,
            },
          });

          // console.log(`case: ${key} ===>`, {
          //   resp,
          // });

          return resp.collection;
        })
      );

      return { key, data: resp };
    })
  );

  console.log({
    data,
  });

  return data;
};

export default async function handler(req, res) {
  try {
    const collections = JSON.parse(req.body);

    const createdCollections = await createCollections({
      collections,
    });

    console.log({
      createdCollections,
    });

    res.status(200).json(createdCollections);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
}
