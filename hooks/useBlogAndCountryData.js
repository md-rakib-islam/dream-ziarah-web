import { GET_ALL_COUNTRIES, GET_CMS_BLOGS } from "@/constant/constants";
import { useState, useEffect } from "react";

const useBlogAndCountryData = () => {
  const [data, setData] = useState({
    blogData: { blogs: [], categories: [] },
    countries: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both APIs in parallel
        const [blogsResponse, countriesResponse] = await Promise.all([
          fetch(GET_CMS_BLOGS),
          fetch(GET_ALL_COUNTRIES),
        ]);

        if (!blogsResponse.ok || !countriesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const blogsData = await blogsResponse.json();
        const countriesData = await countriesResponse.json();

        setData({
          blogData: blogsData || { blogs: [], categories: [] },
          countries: countriesData || [],
        });

        setError(null);
      } catch (err) {
        setError(err.message);
        setData({
          blogData: { blogs: [], categories: [] },
          countries: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    blogData: data.blogData,
    countries: data.countries,
    loading,
    error,
  };
};

export default useBlogAndCountryData;
