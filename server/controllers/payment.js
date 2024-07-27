import Stripe from "stripe";
const stripe = new Stripe("sk_test_51PFz7gSBXJ5pqbcP6yeweMnuKaSn1QqbWTqPX6krAYQ6ioznWSogjSN2zIKbP4dNEOQ8aC6E2mlnoKoetftIF5eQ00XwoFwZV0");

export const payment = async (req, res) => {
    try {
        const { course } = req.body;
        const line_items = [
            {
                price_data: {
                    currency: 'usd', 
                    product_data: {
                        name: course.courseName,
                    },
                    unit_amount: course.coursePrice * 100, 
                },
                quantity: 1,
            }
        ];
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: error.message });
    }
};
