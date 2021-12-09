import axios from "../config/axiosInstance";
import { GetServerSidePropsContext } from "next";

const fetchData = async (
  context: GetServerSidePropsContext,
  url: string
): Promise<{
  props: {
    data: unknown;
  };
}> => {
  try {
    let data;
    if (context.req.headers.cookie) {
      ({ data } = await axios.get(`${url}`, { headers: { access_token: context.req.headers.cookie.slice(13) } }));
    } else {
      ({ data } = await axios.get(`${url}`));
    }
    return {
      props: { data }, // will be passed to the page component as props
    };
  } catch (e) {
    return {
      props: { data: false },
    };
  }
};

export default fetchData;
