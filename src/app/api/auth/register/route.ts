import { connect } from "@/database/mango.config"
import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcrypt";
import { User } from "@/models/user";


//* For DB Connection! 
connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        vine.errorReporter = () => new ErrorReporter()
        const validator = vine.compile(registerSchema)
        const output = await validator.validate(body)

        // Check Already Email Exits in DB
        const user = await User.findOne({ email: output.email })
        if (user) {
            return NextResponse.json({
                status: 400,
                errors: {
                    email: "Email is already exits. Please use another email"
                }
            },
                { status: 200 }
            )
        } else {
            // Encrypt the Password
            const salt = bcrypt.genSaltSync(10)
            output.password = bcrypt.hashSync(output.password, salt)
            await User.create(output)
            return NextResponse.json({
                message: "Account Created Successfully! Please Login to your Account.", status: 200
            },
                { status: 200 })
        }
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({ status: 400, errors: error.messages }, { status: 200 })
        }
    }
}