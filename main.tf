terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 4.21.0"
        }
        random = {
            source = "hashicorp/random"
            version = "~> 3.3.0"
        }
        archive = {
            source = "hashicorp/archive"
            version = "~> 2.2.0"
        }
    }
    required_version = "~> 1.0"
}

provider "aws" {
  region = "ap-northeast-1"
  shared_config_files = [ "$HOME/.aws/credentials" ]
}

resource "aws_s3_bucket" "lambda_bucket" {
    bucket_prefix = "s3-lambda"
    tags = {
      name = "lambda-bucket"
      Environment = "Dev"
    }
    force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "lambda_s3_role" {
  bucket = aws_s3_bucket.lambda_bucket.id
  block_public_acls = true
  block_public_policy = true
  restrict_public_buckets = true
  ignore_public_acls = true
}

resource "aws_iam_role" "lambda_execution" {

    name = "lambda_execution_test_role"
    tags = {tag-key = "test-lambda"}

    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      }, 
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
    
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role = aws_iam_role.lambda_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"

}

data "archive_file" "lambda_functions" {
    type = "zip"

    source_dir = "${path.module}/Backend-Web-master"
    output_path = "${path.module}/Backend-Web-master.zip"

}

resource "aws_lambda_function" "lambda_functions" {
  function_name = "mern_application"
  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key = aws_s3_object.lambda_mern.key

  role = aws_iam_role.lambda_execution.arn

  runtime = "nodejs16.x"
  handler = "index.handler"

  source_code_hash = data.archive_file.lambda_functions.output_base64sha256

}

resource "aws_s3_object" "lambda_mern" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key = "Backend-Web-Master.zip"
  source = data.archive_file.lambda_functions.output_path

  etag = filemd5(data.archive_file.lambda_functions.output_path)
}

resource "aws_cloudwatch_log_group" "lambda_mern" {
  name = "/aws/lambda/${aws_lambda_function.lambda_functions.function_name}"

  retention_in_days = 14
}
