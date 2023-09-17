const axios = require("axios");
const Customers = require("../models/Customer");

let fetchedData = [];

// Fetch data from OData endpoint
async function fetchCustomers(req, res) {
  try {
    const loginUrl =
      "http://23.254.128.117:7048/BusinessCentral140/ODataV4/Company('Mulonga%20Water%20Supply')/Customers";

    const username = "WEBUSER";
    const password = "Pass@123";

    // Encode the username and password in base64 and
    // Set the Authorization header with the encoded credentials
    const authCredentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );

    const headers = {
      Authorization: `Basic ${authCredentials}`,
    };

    const dataResponse = await axios.get(loginUrl, { headers });
    const rawData = dataResponse.data.value;

    // Format the data into an array of objects with the necessary fields
    const formattedData = rawData.map((customer) => ({
      customerNo: customer.No,
      name: customer.Name,
      address: customer.Address,
      address2: customer.Address_2,
      phoneNo: customer.Phone_No,
      balanceDueLCY: customer.Balance_Due_LCY,
    }));

    fetchedData = formattedData;

    console.log("Data fetched:", fetchedData);
    res
      .status(200)
      .json({ message: "Data fetched successfully.", data: fetchedData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
}

// Save fetched data to the local database
async function saveCustomers(req, res) {
  try {
    console.log("Data to be saved:", fetchedData);
    if (fetchedData.length === 0) {
      return res.status(400).json({ message: "No data to save." });
    }

    await Customers.bulkCreate(fetchedData);
    fetchedData = [];
    res.status(200).json({ message: "Data saved successfully." });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "An error occurred while saving data." });
  }
}

async function updateCustomers(req, res) {
  try {
    if (fetchedData.length === 0) {
      return res
        .status(400)
        .json({ message: "No data to update. Please fetch data first." });
    }
    for (const customerData of fetchedData) {
      const { customerNo, name, address, address2, phoneNo, balanceDueLCY } =
        customerData;
      const existingCustomer = await Customers.findOne({
        where: {
          customerNo: customerNo,
        },
      });

      if (existingCustomer) {
        await existingCustomer.update({
          name: name,
          address: address,
          address2: address2,
          phoneNo: phoneNo,
          balanceDueLCY: balanceDueLCY,
        });
        console.log("Customer", customerNo, "updated successfully.");
      } else {
        console.log(
          "Customer",
          customerNo,
          "not found in the database. Skipping."
        );
      }
    }

    fetchedData = [];
    res.status(200).json({ message: "All customers updated successfully." });
  } catch (error) {
    console.error("Error updating customer data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating customer data." });
  }
}

module.exports = { fetchCustomers, saveCustomers,updateCustomers };
