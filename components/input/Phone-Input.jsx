import supabase from "@/config/supabase";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";

const PhoneInput = ({
  name,
  value,
  onChange,
  onBlur,
  isRequired,
  isInvalid,
  errorMessage,
}) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    code: "+91",
    flag: "https://flagcdn.com/in.svg",
  });
  const [phoneNumber, setPhoneNumber] = useState(value || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("available_country")
          .select("*")
          .order("name", { ascending: true });

        if (error) throw error;
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setPhoneNumber("");
  };

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value
      .replace(selectedCountry.code, "")
      .trim();
    setPhoneNumber(inputPhoneNumber);
    if (onChange) onChange(e);
  };

  const countryDropdownItems = useMemo(
    () =>
      countries.map((country, index) => (
        <DropdownItem
          variant="flat"
          key={index}
          value={country.code}
          endContent={country.code}
          startContent={
            <Image
              width={512}
              height={512}
              src={country.flag}
              alt={`${country.name} flag`}
              className="w-6 h-auto mr-2"
            />
          }
          onClick={() => handleCountrySelect(country)}
        >
          {country.name}
        </DropdownItem>
      )),
    [countries]
  );

  return (
    <div className="flex flex-col gap-1">
      <Input
        name={name}
        type="tel"
        variant="faded"
        size="lg"
        classNames={{ inputWrapper: "h-14" }}
        placeholder="Enter phone number"
        value={`${selectedCountry.code} ${phoneNumber}`}
        onChange={handlePhoneNumberChange}
        onBlur={onBlur}
        startContent={
          <Dropdown>
            <DropdownTrigger>
              <div className="flex gap-2 items-center border-r-2 h-full w-20">
                <Image
                  width={512}
                  height={512}
                  src={selectedCountry.flag}
                  alt={`${selectedCountry.name} flag`}
                  className="w-6 h-auto inline-block"
                />
                <ChevronsUpDown
                  className="text-default-400 inline-block"
                  size={20}
                />
              </div>
            </DropdownTrigger>
            <DropdownMenu
              selectedKeys={selectedCountry.code}
              defaultSelectedKeys={selectedCountry.code}
              aria-label="Select country"
              variant="faded"
              className="max-h-72 overflow-y-scroll"
            >
              {countryDropdownItems}
            </DropdownMenu>
          </Dropdown>
        }
        isRequired={isRequired}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default PhoneInput;
