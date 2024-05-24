import React, { useState, useEffect, useContext } from "react";
import { GraphQLClient, RequestDocument, gql } from "graphql-request";
import { useDebounce } from "../hooks/debounce";
import usePrevious from "../hooks/usePrevious";
import { Query } from "react-query";
import { UserContext } from "@Context/UserContext";
import { b } from "vitest/dist/suite-IbNSsUWN.js";

export const GraphQLContext = React.createContext<GraphQLContext | null>(null);

const GraphQLProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, prevData, setUserField, setUserData, setReceipt } = useContext(
    UserContext
  ) as UserContext;

  const [cities, setCities] = useState<City[]>([]);
  const [coverages, setCoverages] = useState<InteliCheck>({
    available: [],
    selected: [],
  });
  const [discounts, setDiscounts] = useState<InteliCheck>({
    available: [],
    selected: [],
  });

  const endpoint = "http://localhost:4000/graphql/";

  const client = new GraphQLClient(endpoint, {
    method: `POST`,
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
  });

  const clientRequest = async (
    query: RequestDocument,
    variables?: { [key: string]: any }
  ) => {
    return await client.request(query, variables);
  };

  useEffect(() => {
    AllCities();
    getUserData();
  }, []);

  useEffect(() => {
    if (data._id != null) {
      updateReceipt();
    }
  }, [discounts.selected, coverages.selected]);

  useEffect(() => {
    if (discounts.available.length > 0 && coverages.available.length > 0) {
      console.log("selection", coverages.selected);
      const length = coverages.selected.length;
      const adviser = discounts.available.filter(
        (cov) => cov.name == "Adviser"
      )[0];
      if (length >= 2 && adviser == undefined) {
        EnableOffer({ name: "Adviser" });
      } else if (length < 2) {
        DisableOffer({ name: "Adviser" });
      }
    }
  }, [coverages.selected.length]);

  const getUserData = useDebounce(() => {
    clientRequest(gql`
      query {
        user: getUser {
          _id
          username
          birthdate
          city {
            _id
            option
            selected
            value
          }
          vehiclepower
          voucher
        }
      }
    `).then((_data: any) => {
      if (_data != null) {
        getAllOffers();
        setUserData({
          ..._data.user,
          birthdate: new Date(Number(_data?.user.birthdate)),
        });
      }
    });
  }, 500);

  const postUserData = () => {
    clientRequest(
      gql`
        mutation CreateUser($user: UserInput!) {
          user: postUser(user: $user) {
            _id
          }
        }
      `,
      { user: data }
    )
      .then((_data: any) => {
        setUserField("_id", _data?.user._id);
        updateReceipt();
      })
      .catch((err) => {
        console.log("[postUserData]: ", err);
      });
  };

  const updateUserData = () => {
    console.log("[updateUserData]: ", data);
    clientRequest(
      gql`
        mutation UpdateUser($user: UserInput!) {
          user: updateUser(user: $user) {
            _id
            vehiclepower
          }
        }
      `,
      { user: data }
    )
      .then((_data: any) => {
        if (_data?.user?._id != null) {
          console.log(data.vehiclepower);
          if (data.vehiclepower > 80) {
            console.log("[Enable VIP]");
            EnableOffer({ name: "VIP" });
          } else {
            console.log("[Disable VIP]");
            DisableOffer({ name: "VIP" });
          }
          if (data.vehiclepower > 100) {
            console.log("[Enable S]");
            EnableOffer({ type: "S" });
          } else {
            console.log("[Disable VIP]");
            DisableOffer({ type: "S" });
          }
        }
      })
      .catch((err) => {
        console.log("[updateUserData]: ", err);
      });
  };
  const AllCities = () => {
    clientRequest(gql`
      query {
        cities: allCities {
          _id
          option
          value
          selected
        }
      }
    `).then((_data: any) => {
      const _cities: City[] = _data?.cities ?? [];
      if (_cities != null) {
        setCities(_cities);
        setUserField(
          "city",
          _cities.filter((city) => city.selected == true)[0]
        );
      }
    });
  };

  const getAllOffers = useDebounce(() => {
    offersByType("C");
    offersByType("D");
  }, 500);
  const offersByType = (type: string) => {
    clientRequest(
      gql`
        query Offers($filter: OfferInput) {
          offers: allOffers(filter: $filter) {
            _id
            type
            condition
            fixed_price
            value
            value_alt
            name
            available
            selected
          }
        }
      `,
      {
        filter: {
          type: type,
          available: true,
        } as OfferInput,
      }
    ).then((_data: any) => {
      const _offers: Offer[] = _data?.offers ?? [];
      const _offersSelected: Offer[] = _offers.filter(
        (offer) => offer.selected == true
      );
      if (type == "C") {
        setCoverages({
          available: _offers,
          selected: _offersSelected,
        });
      } else {
        setDiscounts({
          available: _offers,
          selected: _offersSelected,
        });
      }
    });
  };

  const toggleOffer = (id: string) => {
    clientRequest(
      gql`
        mutation selectOffer($id: ID!) {
          offer: selectOffer(id: $id) {
            _id
            type
            condition
            value
            value_alt
            fixed_price
            name
            available
            selected
          }
        }
      `,
      { id: id }
    ).then((_data: any) => {
      const _offer = _data.offer;
      if (_offer != null) {
        getAllOffers();
      }
    });
  };

  const EnableOffer = (inputFilter: OfferInput) => {
    clientRequest(
      gql`
        mutation offer($filter: OfferInput!) {
          offer: enableOffer(filter: $filter) {
            _id
            type
            condition
            fixed_price
            name
            available
            value
            selected
          }
        }
      `,
      { filter: inputFilter }
    ).then((_data: any) => {
      const _offer = _data?.offer;
      console.log("EnableOffer: ", _offer);
      if (_offer != null) {
        getAllOffers();
      }
    });
  };

  const DisableOffer = (inputFilter: OfferInput) => {
    clientRequest(
      gql`
        mutation disableOffer($filter: OfferInput!) {
          offer: disableOffer(filter: $filter) {
            _id
            type
            condition
            fixed_price
            name
            value
            available
            selected
          }
        }
      `,
      { filter: inputFilter }
    ).then((_data: any) => {
      const _offer = _data.offer;
      console.log("DisableOffer: ", _offer);
      if (_offer != null) {
        console.log("[DisableOffer]", _data);
        if (_offer != null) {
          getAllOffers();
        }
      }
    });
  };

  const selectCity = (id: string) => {
    if (id.length > 0) {
      clientRequest(
        gql`
          mutation ToggleCity($id: ID!) {
            selectCity(id: $id) {
              _id
              option
              selected
              value
            }
          }
        `,
        { id: id }
      ).then((_data: any) => {
        console.log("[selectCity]: ", _data?.selectCity);
        AllCities();
      });
    } else {
      setUserField("city", undefined);
    }
  };

  const updateReceipt = useDebounce(() => {
    if (verifyUser()) {
      clientRequest(
        gql`
          query Total(
            $user: UserInput!
            $coverages: [OfferInput]!
            $discounts: [OfferInput]!
          ) {
            receipt: calculatePrice(
              user: $user
              coverages: $coverages
              discounts: $discounts
            ) {
              base_price
              coverages {
                id
                value
                description
              }
              discounts {
                id
                value
                description
              }
              voucher
              surcharge
              total_price
            }
          }
        `,
        {
          user: {
            ...data,
            vehiclepower: Number(data.vehiclepower),
            voucher: Number(data.voucher),
          },
          coverages: coverages.selected,
          discounts: discounts.selected,
        }
      )
        .then((_data: any) => {
          const _receipt: Receipt = _data?.receipt ?? {
            base_price: 0,
            coverages: [],
            discounts: [],
            surcharge: 0,
            total_price: 0,
          };
          console.log("updateReceipt: ", _receipt);
          setReceipt({ ..._receipt });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, 1000);

  const resetReceipt = () => {
    setReceipt({
      base_price: 0,
      coverages: [],
      discounts: [],
      surcharge: 0,
      total_price: 0,
    });

    if (data.vehiclepower > 80) {
      console.log("[Enable VIP]");
      EnableOffer({ name: "VIP" });
    } else {
      console.log("[Disable VIP]");
      DisableOffer({ name: "VIP" });
    }
    if (data.vehiclepower > 100) {
      console.log("[Enable S]");
      EnableOffer({ type: "S" });
    } else {
      console.log("[Disable VIP]");
      DisableOffer({ type: "S" });
    }
  };

  const verifyUser = () => {
    console.log(
      "verify",
      data,
      data.city != undefined,
      typeof data.birthdate,
      data.vehiclepower > 0
    );
    return (
      data.username.length > 0 &&
      data.birthdate &&
      data.city != undefined &&
      data.vehiclepower > 0
    );
  };

  return (
    <GraphQLContext.Provider
      value={{
        coverages,
        discounts,
        cities,
        selectCity,
        toggleOffer,
        resetReceipt,
        postUserData,
        updateUserData,
        updateReceipt,
      }}
    >
      {children}
    </GraphQLContext.Provider>
  );
};

export default GraphQLProvider;
