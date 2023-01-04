router.get('/order/guest', async(req,res) =>{
    try {
        const user = await Cloth.findAll();
        // 오류 예제
        // try catch 있을때/없을때
        // const posts = await NonexistentCollection.find({});
    
        res.send(user);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
      }
    }); 