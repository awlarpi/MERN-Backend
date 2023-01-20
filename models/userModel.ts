import { model, Schema } from "mongoose"
import bcrypt from "bcrypt"

const schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        statics: {
            async signup(email: string, password: string) {
                const exists = await this.findOne({ email })

                if (exists) {
                    throw Error("Email already in use")
                }

                const hash = await bcrypt.hash(password, 10)

                const user = await this.create({ email, password: hash })

                return user
            },

            async login(email: string, password: string) {
                const user = await this.findOne({ email })

                if (!user) {
                    throw Error("Email and password do not match")
                }

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password
                )

                if (!passwordMatch) {
                    throw Error("Email and password do not match")
                }

                // execute user login logic
                return user
            },
        },
    }
)

const User = model("User", schema)

export default User
