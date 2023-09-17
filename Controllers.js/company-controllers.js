const CompanyData = require('../models/company-data');

async function getCompany (req, res) {
    try {
        const companies = await CompanyData.findAll();
        console.log(companies);
        res.status(200).json(companies);
    } catch (error) {
        console.error('Error retrieving companies:', error);
        res.status(500).json({ message: 'An error occurred while retrieving company details' });
    }
};

async function createCompany (req, res) {
    try {
        const companyData = req.body;
        const newCompany = await CompanyData.create({
            Name: companyData.Name,
            Address: companyData.Address,
            Post_Address: companyData.Post_Address,
            Telephone: companyData.Telephone,
            Fax: companyData.Fax,
            Email: companyData.Email,
        });

        res.status(201).json({ message: 'Company created successfully.', company: newCompany });
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ message: 'An error occurred while creating company.' });
    }
};

async function deleteCompany (req, res){
    try {
        const { id } = req.params;
        const company = await CompanyData.findByPk(id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found.' });
        }
        await company.destroy({
            where: {
                id: id
            }
        });
        res.json({ message: 'Company deleted successfully.' });
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).json({ message: 'An error occurred while deleting company.' });
    }
};

module.exports = {getCompany,createCompany,deleteCompany};