export interface Tweet {
  id: string;
  user: string;
  title: string;
  content: string;
}

let tweets: Array<Tweet> = [{
  id: "1",
  user: "taro",
  title: "隣の客はよく蟹食う客だ",
  content: "蟹食べ行こう",
}, {
  id: "2",
  user: "john",
  title: "隣の蟹はよくエビ食う蟹だ",
  content: "エビ食べ行こう",
}, {
  id: "3",
  user: "海老蔵",
  title: "隣のエビはよく、、、",
  content: "えびぞりしてみよう",
}];

const findTweetById = (id: string): (Tweet | undefined) =>
  tweets.filter((tweet) => tweet.id === id)[0];

const getTweets = ({ response }: { response: any }) => {
  response.body = tweets;
};

const getTweet = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const tweet: Tweet | undefined = findTweetById(params.id);
  if (tweet) {
    response.status = 200;
    response.body = tweet;
  } else {
    response.status = 404;
    response.body = { message: "tweet was not found" };
  }
};

const addTweet = async (
  { request, response }: { request: any; response: any },
) => {
  const reqBody = await request.body();
  const tweet: Tweet = reqBody.value;
  tweets.push(tweet);
  response.body = { message: "OK" };
  response.status = 200;
};

const updateTweet = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  let tweet: Tweet | undefined = findTweetById(params.id);
  if (tweet) {
    const reqBody = request.body();
    const updateContent: { user?: string; title?: string; content?: string } =
      reqBody.value;
    tweet = { ...tweet, ...updateContent };
    tweets = [...tweets.filter((tweet) => tweet.id !== params.id), tweet];
    response.status = 200;
    response.body = { message: "ok" };
  } else {
    response.status = 404;
    response.body = { message: "tweet not found" };
  }
};

const deleteTweet = (
  { params, response }: { params: { id: string }; response: any },
) => {
  tweets = tweets.filter((tweet) => tweet.id !== params.id);
  response.status = 200;
  response.body = { message: "ok" };
};

export { getTweets, getTweet, addTweet, updateTweet, deleteTweet };
