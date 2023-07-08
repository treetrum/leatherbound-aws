import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { PrivateWritePublicReadBucket } from './private-write-public-read-bucket';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class LeatherboundAwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lbBackendUser = new iam.User(this, 'LBBackendUser', {
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess')],
    });

    // Bucket for storing covers
    const lbCoversBucket = new PrivateWritePublicReadBucket(this, 'LBCoversBucket', lbBackendUser);

    // Cloudfront for book covers bucket
    new cloudfront.Distribution(this, 'LBCoversDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(lbCoversBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
  }
}
