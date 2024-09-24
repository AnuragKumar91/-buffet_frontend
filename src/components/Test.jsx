import React, { useEffect, useState } from "react";

const Test = () => {
  const [formData, setFormData] = useState({
    branch: "",
  });
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      console.log("Fetching branches...");

      try {
        const response = await fetch("https://shantilalsfoods.com/api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "branchLists",
            apiKey: "ASnnKVf5#ip*wtA/UQtcY?X&)d@[6Y",
          }),
        });

        console.log("Response received");

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response Status:", response.status);
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const responseJson = await response.json(); // Parse the JSON response

        if (responseJson.success && responseJson.data) {
          setBranches(responseJson.data); // Set the branches data
        } else {
          console.error("Invalid response format:", responseJson);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <>
      <div className="form-group mb-3">
        <select
          className="form-select"
          id="branch"
          value={formData.branch}
          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
          required
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.branch} {/* Ensure this matches the correct field name */}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Test;
