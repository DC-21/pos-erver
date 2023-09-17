const GLA = require("../models/gl-accounts");
const axios = require("axios");

let fetchedData = [];

async function fetchGlAccounts(req, res) {
  try {
    const loginUrl =
      "http://23.254.128.117:7048/BusinessCentral140/ODataV4/Company('Mulonga%20Water%20Supply')/GLAccounts";

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

    const formattedData = rawData.map((glaccounts) => ({
      code: glaccounts.No,
      name: glaccounts.Name,
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

async function postGlAccounts(req, res) {
  try {

    console.log("Data to be saved:", fetchedData);

    if (fetchedData.length === 0) {
      return res.status(400).json({ message: "No data to save." });
    }

    await GLA.bulkCreate(fetchedData);
    fetchedData = [];

    res.status(200).json({ message: "Data saved successfully." });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "An error occurred while saving data." });
  }
}

async function updateGlAccounts(req, res) {
  try {
    if (fetchedData.length === 0) {
      return res
        .status(400)
        .json({ message: "No data to update. Please fetch data first." });
    }
    for (const glAccount of fetchedData) {
      const { code, name } = glAccount;
      const existingGlAccount = await GLA.findOne({
        where: {
          code: code,
        },
      });

      if (existingGlAccount) {
        await existingGlAccount.update({
          code: code,
          name: name,
        });
        console.log("GL accounts", code, "updated successfully.");
      } else {
        console.log(
          "GL accounts",
          code,
          "not found in the database. Skipping."
        );
      }
    }

    fetchedData = [];

    res.status(200).json({ message: "All G/L accounts updated successfully." });
  } catch (error) {
    console.error("Error updating G/L accounts data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating G/L accounts data." });
  }
}

async function getGlAccounts(req, res) {
  try {
    const customerData = await GLA.findAll();
    return res.json({ customerData });
  } catch (error) {
    console.error("Error fetching next receipt number:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {fetchGlAccounts,postGlAccounts,updateGlAccounts,getGlAccounts};
