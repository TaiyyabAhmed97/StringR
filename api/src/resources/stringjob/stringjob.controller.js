import { StringJob } from './stringjob.model'

export const getStringJob = async (req, res) => {
    try {
        let stringJob = StringJob.findById(req.params.id)
        if (!stringJob) {
            console.log('could not find user')
            return res.status(400).send({ error: 'could not find user with given id' })
        }
        return res.status(201).send({ data: stringJob })
    }
    catch (e) {
        console.error(e)
        return res.status(400).send({ error: e })
    }
}

export const createStringJob = async (req, res) => {
    try {
        let sJob = await StringJob.create(req.body)
        if (!sJob) {
            console.log('could not find user')
            return res.status(400).send({ error: 'could not create transaction' })
        }
        return res.status(201).send({ data: sJob })
    }
    catch (e) {
        console.error(e)
        return res.status(400).send({ error: e })
    }
}

