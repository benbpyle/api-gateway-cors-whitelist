import { CfnOutput } from "aws-cdk-lib";
import {
    Effect,
    PolicyStatement,
    Role,
    ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface CorsRoleProps {
    func: IFunction;
}

export default class CorsRoleConstruct extends Construct {
    constructor(scope: Construct, id: string, props: CorsRoleProps) {
        super(scope, id);

        const apiRole = new Role(scope, "apiRole", {
            roleName: "ApiGatewayCorsInvoke",
            assumedBy: new ServicePrincipal("apigateway.amazonaws.com"),
        });

        apiRole.addToPolicy(
            new PolicyStatement({
                resources: [props.func.functionArn],
                actions: ["lambda:InvokeFunction"],
                effect: Effect.ALLOW,
            })
        );
    }
}
