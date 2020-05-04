import app from "./app";

const PORT = process.env.PORT || 5000;

async function main() {
    await app.listen(PORT,() =>{
        console.log(`Server on port ${PORT}`);
    });
}
main();