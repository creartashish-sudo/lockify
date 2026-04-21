const Website = require('../Models/Website');
const { decrypt, encrypt } = require('../utils/crypto');

const getWebsite = async (req, res) => {
    try {

        const websiteInfo = await Website.find({userId: req.params.userId});

        const decryptedData = websiteInfo.map(site => ({
            ...site._doc,
            password: decrypt(site.password),
          }));
        res.status(200).json({
            status: true,
            data: decryptedData,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

const insertWebsite = async (req, res) => {
    try {
        const encryptedPassword = encrypt(req.body.password);
        const website = new Website({
            website_name: req.body.website_name,
            username: req.body.username,
            password: encryptedPassword,
            userId: req.body.userId,
          });
          console.log(website);
        await website.save();
        res.status(201).json({
            status: true,
            message: 'Website inserted successfully',
            data: website,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
}

const updateWebsite = async (req, res) => {
    try {
        // const websiteId = req.params.id;
        const updatedData = req.body;
        const encryptedPassword = encrypt(req.body.password);
        updatedData.password = encryptedPassword;

        const website = await Website.findByIdAndUpdate(updatedData.id, updatedData, { new: true });

        if (!website) {
            return res.status(404).json({
                status: false,
                message: 'Website not found',
            });
        }

        res.status(200).json({
            status: true,
            message: 'Website updated successfully',
            data: website,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
}

const deleteWebsite = async (req, res) => {
    try {
        const websiteId = req.params.id;
        const website = await Website.findByIdAndDelete(websiteId);

        if (!website) {
            return res.status(404).json({
                status: false,
                message: 'Website not found',
            });
        }

        res.status(200).json({
            status: true,
            message: 'Website deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}


module.exports = { getWebsite, insertWebsite, updateWebsite, deleteWebsite };